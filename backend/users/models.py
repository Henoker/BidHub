import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(verbose_name=_("Username"), max_length=255, unique=True)
    first_name = models.CharField(verbose_name=_("First Name"), max_length=50)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=50)
    email = models.EmailField(verbose_name=_("Email Address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.username

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.username

# Create your models here.

# class MyAccountManager(BaseUserManager):
#     def create_user(self ,name, email,phonenumber, password=None):
#         if not email:
#             raise ValueError("User must have a email")
#         if not phonenumber:
#             raise ValueError("User must have a phone number")

#         email = self.normalize_email(email)
#         email  = email.lower()
#         user = self.model(
#             email = self.normalize_email(email),
#             name  = name,
#             phonenumber = phonenumber,
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user
    
#     def create_superuser(self ,name,phonenumber, email, password):
#         user = self.create_user(
#             email = email,
#             name  = name,
#             password = password,
#             phonenumber = phonenumber,
#         )

#         user.is_admin = True
#         user.is_staff = True
#         user.is_active = True
#         user.is_verified = True
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user

# class UserAccount(AbstractBaseUser):
#     name = models.CharField(max_length = 50,blank=False)
#     email  = models.EmailField(max_length = 100, unique = True,blank=False)
#     phonenumber = models.CharField(max_length = 10,unique = True)
#     image = models.ImageField(upload_to='profiles/', blank=True,null=True)
#     date_joined = models.DateField(auto_now_add = True)
#     last_login = models.DateField(auto_now_add=True)
    
#     is_active = models.BooleanField(default=True)
#     is_block = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)
#     is_verified = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'phonenumber']

#     objects = MyAccountManager()
#     def __str__(self):
#         return self.email
#     def has_perm(self, perm, obj=None):
#       return self.is_admin
    
#     def has_module_perms(self, app_label):
#         return True