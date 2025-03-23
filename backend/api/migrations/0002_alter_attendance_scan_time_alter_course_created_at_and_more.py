# Generated by Django 5.1.6 on 2025-03-18 14:41

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='scan_time',
            field=models.DateTimeField(default=api.models.current_time),
        ),
        migrations.AlterField(
            model_name='course',
            name='created_at',
            field=models.DateTimeField(default=api.models.current_time),
        ),
        migrations.AlterField(
            model_name='enrollment',
            name='enrolled_at',
            field=models.DateTimeField(default=api.models.current_time),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='created_at',
            field=models.DateTimeField(default=api.models.current_time),
        ),
        migrations.AlterField(
            model_name='student',
            name='enrollment_date',
            field=models.DateField(default=api.models.current_time),
        ),
        migrations.AlterField(
            model_name='submission',
            name='submitted_at',
            field=models.DateTimeField(default=api.models.current_time),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='hire_date',
            field=models.DateField(default=api.models.current_time),
        ),
    ]
