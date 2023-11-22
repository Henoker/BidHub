from rest_framework import serializers
from .models import Bid, AuctionListings, Comments

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'

class AuctionListingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionListings
        fields = '__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'