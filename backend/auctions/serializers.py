# serializers.py
from rest_framework import serializers
from .models import Bid, AuctionListings, Comments
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Add other fields if needed


class BidSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Bid
        fields = ['id', 'bid', 'user']


class CommentsSerializer(serializers.ModelSerializer):
    writer = UserSerializer(read_only=True)

    class Meta:
        model = Comments
        fields = ['id', 'text', 'writer', 'listing']


class AuctionListingsSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    bid = BidSerializer(read_only=True)
    watchlist = UserSerializer(many=True, read_only=True)
    comments = CommentsSerializer(many=True, read_only=True)

    class Meta:
        model = AuctionListings
        fields = ['id', 'name_of_item', 'description', 'owner', 'bid',
                  'is_closed', 'url', 'watchlist', 'category', 'comments']
