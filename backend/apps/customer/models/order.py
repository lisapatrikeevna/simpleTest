from django.db import models

from apps.user.models import User


class Order(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")

    def __str__(self):
        return f"{self.title} (User: {self.user.email})"

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        ordering = ['id']
