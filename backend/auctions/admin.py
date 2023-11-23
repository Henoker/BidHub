from django.contrib import admin
from . models import Bid, AuctionListings, Comments


# Register your models here.
admin.site.register(Bid)
admin.site.register(AuctionListings)
admin.site.register(Comments)