from django.urls import path, include

urlpatterns = [
    path('order/', include('apps.customer.urls')),
    path('user/', include('apps.user.urls')),

]
