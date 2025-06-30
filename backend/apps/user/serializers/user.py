from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from apps.user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['id', 'is_admin']


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, required=False)

    def validate(self, attrs):
        identifier = attrs.get('identifier')
        password = attrs.get('password')
        user = None
        print('---identifier, password---', identifier, password)
        if User.objects.filter(username=identifier).exists():
            user = User.objects.get(username=identifier)
            if not check_password(password, user.password):
                raise serializers.ValidationError("Invalid username or password.")

        elif User.objects.filter(email=identifier).exists():
            user = authenticate(request=self.context.get('request'), email=identifier, password=password)
            if user is None:
                raise serializers.ValidationError("Invalid email or password.")

        else:
            raise serializers.ValidationError("User with provided email/username does not exist.")

        if not user.is_active:
            raise serializers.ValidationError("User account has been disabled.")

        attrs['user'] = user
        return attrs

