from django.contrib import admin
from . models import User, Bid, AuctionListings, Comments

# Register your models here.


class BidAdmin(admin.ModelAdmin):
    list_display = ('user', 'bid')
    list_filter = ('user', 'bid')
    search_fields = ('user__username', 'bid')


class AuctionListingsAdmin(admin.ModelAdmin):
    list_display = ('name_of_item', 'owner', 'bid', 'is_closed')
    list_filter = ('owner', 'bid', 'is_closed')
    search_fields = ('name_of_item', 'owner', 'bid')


class CommentsAdmin(admin.ModelAdmin):
    list_display = ('text', 'listing', 'writer')
    list_filter = ('listing', 'writer')
    search_fields = ('text', 'listing', 'writer')


admin.site.register(Bid, BidAdmin)
admin.site.register(AuctionListings, AuctionListingsAdmin)
admin.site.register(Comments, CommentsAdmin)
