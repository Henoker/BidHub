from django.contrib import admin
from .models import UserAccount, OneTimePassword

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(OneTimePassword)
