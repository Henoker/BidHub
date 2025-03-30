# views.py
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import AuctionListings, Bid, Comments
from .serializers import AuctionListingsSerializer, BidSerializer, CommentSerializer
from django.contrib.auth import get_user_model
from knox.auth import TokenAuthentication
from django.shortcuts import get_object_or_404


User = get_user_model()


class CreateListingView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        user = request.user
        data = request.data

        # Create a new bid
        bid = Bid(bid=int(data["bid"]), user=user)
        bid.save()

        # Create a new listing
        listing = AuctionListings(
            name_of_item=data["name_of_item"],
            description=data["description"],
            owner=user,
            bid=bid,
            is_closed=False,
            url=data["image_url"],
            category=data["category"]
        )
        listing.save()

        serializer = AuctionListingsSerializer(listing)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DisplayListingView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, listing_id):
        listing = get_object_or_404(AuctionListings, pk=listing_id)
        comments = listing.comments.all()
        is_owner = request.user == listing.owner
        is_listing_in_watchlist = request.user in listing.watchlist.all()

        serializer = AuctionListingsSerializer(listing)
        return Response({
            "listing": serializer.data,
            "comments": CommentSerializer(comments, many=True).data,
            "is_owner": is_owner,
            "is_listing_in_watchlist": is_listing_in_watchlist
        })

    def put(self, request, listing_id):
        """Fully update a listing (all fields required)."""
        listing = get_object_or_404(AuctionListings, pk=listing_id)

        if request.user != listing.owner:
            return Response({"error": "You do not have permission to update this listing."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AuctionListingsSerializer(listing, data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the updated data to the database
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, listing_id):
        """Partially update a listing (some fields can be omitted)."""
        listing = get_object_or_404(AuctionListings, pk=listing_id)

        if request.user != listing.owner:
            return Response({"error": "You do not have permission to update this listing."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AuctionListingsSerializer(
            listing, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Save only the updated fields
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WatchlistView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, listing_id):
        user = request.user
        listing = AuctionListings.objects.get(pk=listing_id)
        listing.watchlist.add(user)
        return Response({"message": "Added to watchlist"}, status=status.HTTP_200_OK)

    def delete(self, request, listing_id):
        user = request.user
        listing = AuctionListings.objects.get(pk=listing_id)
        listing.watchlist.remove(user)
        return Response({"message": "Removed from watchlist"}, status=status.HTTP_200_OK)


class CloseAuctionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, listing_id):
        listing = AuctionListings.objects.get(pk=listing_id)
        listing.is_closed = True
        listing.save()
        return Response({"message": "Auction closed"}, status=status.HTTP_200_OK)


class AddCommentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, listing_id):
        """ Add a new comment to a listing """
        try:
            listing = get_object_or_404(AuctionListings, pk=listing_id)
            text = request.data.get("comment", "")

            if not text.strip():
                return Response({"error": "Comment cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

            new_comment = Comments.objects.create(
                text=text,
                writer=request.user,
                listing=listing
            )

            return Response(
                {"message": "Comment added",
                    "comment": CommentSerializer(new_comment).data},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetCommentsView(APIView):
    """ Retrieve all comments for a listing """

    def get(self, request, listing_id):
        listing = get_object_or_404(AuctionListings, pk=listing_id)
        comments = Comments.objects.filter(listing=listing).order_by(
            "-created_at")  # Latest comments first
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WatchlistListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    # GET - Retrieve the user's watchlist
    def get(self, request):
        user = request.user
        users_watchlist_of_items = user.watch_listings.all()
        serializer = AuctionListingsSerializer(
            users_watchlist_of_items, many=True)
        return Response(serializer.data)

    # POST - Add an item to the watchlist
    def post(self, request):
        user = request.user
        # Ensure frontend sends this
        listing_id = request.data.get("listing_id")
        if not listing_id:
            return Response({"message": "listing_id is required"}, status=400)

        try:
            listing = AuctionListings.objects.get(id=listing_id)
            # Assuming a ManyToMany relationship
            user.watch_listings.add(listing)
            return Response({"message": "Added to watchlist"}, status=201)
        except AuctionListings.DoesNotExist:
            return Response({"message": "Listing not found"}, status=404)

    # DELETE - Remove an item from the watchlist
    def delete(self, request):
        user = request.user
        listing_id = request.data.get("listing_id")

        if not listing_id:
            return Response({"error": "listing_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        listing = get_object_or_404(AuctionListings, id=listing_id)

        if listing not in user.watch_listings.all():
            return Response({"message": "Listing is not in watchlist"}, status=status.HTTP_400_BAD_REQUEST)

        user.watch_listings.remove(listing)  # Remove from watchlist
        return Response({"message": "Listing removed from watchlist"}, status=status.HTTP_200_OK)


class CategoryView(APIView):
    def post(self, request):
        chosen_category = request.data["category"]
        active_listings = AuctionListings.objects.filter(
            is_closed=False, category=chosen_category)
        serializer = AuctionListingsSerializer(active_listings, many=True)
        return Response(serializer.data)


class NewBidView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, listing_id):
        try:
            listing = AuctionListings.objects.get(pk=listing_id)
            # ✅ Use .get() to avoid KeyError
            new_bid = int(request.data.get("new_bid"))

            if new_bid is None:
                return Response({"error": "new_bid is required."}, status=status.HTTP_400_BAD_REQUEST)

            current_bid = listing.bid.bid

            if new_bid > current_bid:
                updated_bid = Bid(bid=new_bid, user=request.user)
                updated_bid.save()
                listing.bid = updated_bid
                listing.save()
                return Response({"message": "Your bid was added successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Your bid should be higher than the latest bid."}, status=status.HTTP_400_BAD_REQUEST)

        except AuctionListings.DoesNotExist:
            return Response({"error": "Listing not found."}, status=status.HTTP_404_NOT_FOUND)

        except ValueError:
            return Response({"error": "Invalid bid amount."}, status=status.HTTP_400_BAD_REQUEST)


class IndexView(APIView):
    def get(self, request):
        active_listings = AuctionListings.objects.filter(is_closed=False)
        serializer = AuctionListingsSerializer(active_listings, many=True)
        return Response(serializer.data)
