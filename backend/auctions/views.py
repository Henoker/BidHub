# views.py
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import AuctionListings, Bid, Comments
from .serializers import AuctionListingsSerializer, BidSerializer, CommentsSerializer
from django.contrib.auth import get_user_model
from knox.auth import TokenAuthentication

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

    def get(self, request, listing_id):
        listing = AuctionListings.objects.get(pk=listing_id)
        comments = listing.comments.all()
        is_owner = request.user == listing.owner
        is_listing_in_watchlist = request.user in listing.watchlist.all()

        serializer = AuctionListingsSerializer(listing)
        return Response({
            "listing": serializer.data,
            "comments": CommentsSerializer(comments, many=True).data,
            "is_owner": is_owner,
            "is_listing_in_watchlist": is_listing_in_watchlist
        })


class WatchlistView(APIView):
    permission_classes = [IsAuthenticated]

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

    def post(self, request, listing_id):
        listing = AuctionListings.objects.get(pk=listing_id)
        listing.is_closed = True
        listing.save()
        return Response({"message": "Auction closed"}, status=status.HTTP_200_OK)


class AddCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, listing_id):
        user = request.user
        text = request.data["comment"]
        listing = AuctionListings.objects.get(pk=listing_id)
        new_comment = Comments(text=text, writer=user, listing=listing)
        new_comment.save()
        return Response({"message": "Comment added"}, status=status.HTTP_201_CREATED)


class WatchlistListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        users_watchlist_of_items = user.watch_listings.all()
        serializer = AuctionListingsSerializer(
            users_watchlist_of_items, many=True)
        return Response(serializer.data)


class CategoryView(APIView):
    def post(self, request):
        chosen_category = request.data["category"]
        active_listings = AuctionListings.objects.filter(
            is_closed=False, category=chosen_category)
        serializer = AuctionListingsSerializer(active_listings, many=True)
        return Response(serializer.data)


class NewBidView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, listing_id):
        listing = AuctionListings.objects.get(pk=listing_id)
        new_bid = int(request.data["new_bid"])
        current_bid = listing.bid.bid

        if new_bid > current_bid:
            updated_bid = Bid(bid=new_bid, user=request.user)
            updated_bid.save()
            listing.bid = updated_bid
            listing.save()
            return Response({"message": "Your bid was added successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Sorry, your bid should be bigger than the latest bid."}, status=status.HTTP_400_BAD_REQUEST)


class IndexView(APIView):
    def get(self, request):
        active_listings = AuctionListings.objects.filter(is_closed=False)
        serializer = AuctionListingsSerializer(active_listings, many=True)
        return Response(serializer.data)
