from django.urls import path
from .views import (
    CreateListingView, DisplayListingView, WatchlistView, CloseAuctionView,
    AddCommentView, WatchlistListView, CategoryView, NewBidView, IndexView, GetCommentsView
)

urlpatterns = [
    path('create-listing/', CreateListingView.as_view(), name='create-listing'),
    path('listing/<int:listing_id>/',
         DisplayListingView.as_view(), name='display-listing'),
    path('watchlist/<int:listing_id>/',
         WatchlistView.as_view(), name='watchlist'),
    path('close-auction/<int:listing_id>/',
         CloseAuctionView.as_view(), name='close-auction'),
    path('add-comment/<int:listing_id>/',
         AddCommentView.as_view(), name='add-comment'),

    path('comments/<int:listing_id>/',
         GetCommentsView.as_view(), name='get-comments'),
    # urls.py
    path('watchlist/', WatchlistListView.as_view(), name='watchlist-list'),
    path('category/', CategoryView.as_view(), name='category'),
    path('new-bid/<int:listing_id>/', NewBidView.as_view(), name='new-bid'),
    path('listing/', IndexView.as_view(), name='index'),

]
