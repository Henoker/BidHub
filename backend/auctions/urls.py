from django.urls import path
from .views import BidListView, AuctionListingsView, CommentsView, AuctionListingDetail

urlpatterns = [
    path('bids/', BidListView.as_view(), name='bid-list'),
    path("<int:pk>/", AuctionListingDetail.as_view(), name="auction_detail"),
    path("", AuctionListingsView.as_view(), name="auction_list"),
    path('comments/', CommentsView.as_view(), name='comments'),
  
]