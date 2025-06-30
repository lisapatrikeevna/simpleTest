from django.urls import path

from apps.user.views.user import UserCreateAPIView, UserListAPIView, UserRetrieveUpdateDestroyAPIView,LoginView

urlpatterns = [
    path('', UserListAPIView.as_view(), name='user-list'),
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),
]