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


class CommentSerializer(serializers.ModelSerializer):
    writer = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Comments
        fields = ['id', 'text', 'writer', 'created_at']
        read_only_fields = ['writer', 'created_at']

    def get_writer(self, obj):
        return {
            'id': obj.writer.id,
            'username': obj.writer.username,
            'email': obj.writer.email
        }


class AuctionListingsSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    bid = BidSerializer(read_only=True)
    watchlist = UserSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = AuctionListings
        fields = ['id', 'name_of_item', 'description', 'owner', 'bid',
                  'is_closed', 'url', 'watchlist', 'category', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    writer = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Comments
        fields = ['id', 'text', 'writer', 'created_at']
        read_only_fields = ['writer', 'created_at']

    def get_writer(self, obj):
        return {
            'id': obj.writer.id,
            'username': obj.writer.username,
            'email': obj.writer.email
        }
