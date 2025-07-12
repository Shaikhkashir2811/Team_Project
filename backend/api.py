from datas import db  # or from app import db if you're using a package
# from your_app.models import SkillSwap  # assuming your models are in a models.py file

db.create_all()  # This will create all tables that don't exist yet
