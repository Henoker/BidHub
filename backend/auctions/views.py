# views.py
from rest_framework import viewsets, generics
from .models import Bid, AuctionListings, Comments
from .serializers import BidSerializer, AuctionListingsSerializer, CommentsSerializer

class BidListView(generics.ListCreateAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer

class AuctionListingsView(generics.ListCreateAPIView):
    queryset = AuctionListings.objects.all()
    serializer_class = AuctionListingsSerializer

class AuctionListingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AuctionListings.objects.all()
    serializer_class = AuctionListingsSerializer
class CommentsView(generics.ListCreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer


# Create your views here.
