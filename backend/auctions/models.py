# models.py
from django.conf import settings
from django.db import models




class Bid(models.Model):
    bid = models.IntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bids")

    def __str__(self):
        return f"Bid of {self.bid} from {self.user}"

class AuctionListings(models.Model):
    name_of_item = models.CharField(max_length=32)
    description = models.CharField(max_length=400)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="auction_listings", default=None)
    bid = models.ForeignKey(Bid, on_delete=models.CASCADE, related_name="auction_listings", default=None)
    is_closed = models.BooleanField(default=False, blank=True, null=True)
    url = models.CharField(max_length=800)
    watchlist = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="watch_listings")
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name_of_item}: {self.bid}"

class Comments(models.Model):
    text = models.CharField(max_length=800)
    writer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments")
    listing = models.ForeignKey(AuctionListings, on_delete=models.CASCADE, related_name="comments")
