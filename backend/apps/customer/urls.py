from django.urls import path

from apps.customer.views.order import OrderListCreateApiView,OrderRetrieveUpdateAPIView

urlpatterns = [
    path('', OrderListCreateApiView.as_view(), name='order-list-create'),
    path('<int:pk>/', OrderRetrieveUpdateAPIView.as_view(), name='order-list-update'),
]
