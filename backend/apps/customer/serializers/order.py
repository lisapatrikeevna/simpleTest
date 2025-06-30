from rest_framework import serializers

from apps.customer.models.order import Order
from apps.user.models import User


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def validate_user(self, value):
        if not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("User with this ID does not exist.")
        return value
