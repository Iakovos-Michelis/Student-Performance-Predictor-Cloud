from django.db import models
from django.contrib.auth.models import User

class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    math_score = models.FloatField()
    reading_score = models.FloatField()
    writing_score = models.FloatField()
    result = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.result}"