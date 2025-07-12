from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# app = Flask(__name__)

# === Config ===
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///skillswap.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# === Models ===

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    location = db.Column(db.String(100))
    skills_offered = db.Column(db.Text)
    skills_wanted = db.Column(db.Text)
    availability = db.Column(db.String(50))
    profile = db.Column(db.String(20))  # "Public" or "Private"
    profile_photo = db.Column(db.String(255))

class SkillSwap(db.Model):
    __tablename__ = 'swap_skills'
    
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    responder_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skill_offered = db.Column(db.String(100), nullable=False)
    skill_requested = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='pending')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    requester = db.relationship('User', foreign_keys=[requester_id], backref='requests_made')
    responder = db.relationship('User', foreign_keys=[responder_id], backref='requests_received')

# === Routes ===
@app.route('/login', methods=['POST'])
def login():
    print("Login endpoint hit")
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email, password=password).first()

    if user:
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    print("Register endpoint hit")
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    try:
        user = User(email=email, password=password, name="")  # name is required, set to blank initially
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered with email and password', 'user_id': user.id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
@app.route('/update-profile/<int:user_id>', methods=['PUT'])
def update_profile(user_id):
    print(f"Update profile endpoint hit for user_id: {user_id}")
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Update only allowed fields
    user.name = data.get('name', user.name)
    user.location = data.get('location', user.location)
    user.skills_offered = ','.join(data.get('skills_offered', user.skills_offered.split(','))) if data.get('skills_offered') else user.skills_offered
    user.skills_wanted = ','.join(data.get('skills_wanted', user.skills_wanted.split(','))) if data.get('skills_wanted') else user.skills_wanted
    user.availability = data.get('availability', user.availability)
    user.profile = data.get('profile', user.profile)
    user.profile_photo = data.get('profile_photo', user.profile_photo)

    try:
        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
@app.route('/swap', methods=['POST'])
def create_skill_swap():
    data = request.get_json()

    try:
        swap = SkillSwap(
            requester_id=data['fromUserId'],
            responder_id=data['toUserId'],
            skill_requested=', '.join(data['skillsRequested']),
            skill_offered=', '.join(data['skillsOffered']),
            status=data.get('status', 'Pending'),
            
        )
        db.session.add(swap)
        db.session.commit()
        return jsonify({'message': 'Skill swap request created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for u in users:
        user_list.append({
            'id': u.id,
            'name': u.name,
            'email': u.email,
            'location': u.location,
            'skills_offered': u.skills_offered.split(',') if u.skills_offered else [],
            'skills_wanted': u.skills_wanted.split(',') if u.skills_wanted else [],
            'availability': u.availability,
            'profile': u.profile,
            'profile_photo': u.profile_photo
        })
    return jsonify(user_list)

@app.route('/swap', methods=['POST'])
def create_swap():
    data = request.get_json()
    try:
        swap = SkillSwap(
            requester_id=data['requester_id'],
            responder_id=data['responder_id'],
            skill_offered=data['skill_offered'],
            skill_requested=data['skill_requested']
        )
        db.session.add(swap)
        db.session.commit()
        return jsonify({'message': 'Skill swap request created'}), 201
    except Exception as e:
        print(f"Error creating swap: {e}")
        return jsonify({'error': str(e)}), 400
@app.route('/swap/responder/<int:user_id>', methods=['GET'])
def get_requests_for_responder(user_id):
    try:
        requests = SkillSwap.query.filter_by(responder_id=user_id).all()

        result = []
        for r in requests:
            result.append({
                'id': r.id,
                'requester_id': r.requester_id,
                'responder_id': r.responder_id,
                'skill_offered': r.skill_offered,
                'skill_requested': r.skill_requested,
                'status': r.status,
                'timestamp': r.timestamp.isoformat()
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/swaps', methods=['GET'])
def get_swaps():
    swaps = SkillSwap.query.all()
    swap_list = []
    for s in swaps:
        swap_list.append({
            'id': s.id,
            'requester_id': s.requester_id,
            'responder_id': s.responder_id,
            'skill_offered': s.skill_offered,
            'skill_requested': s.skill_requested,
            'status': s.status,
            'timestamp': s.timestamp.isoformat()
        })
    return jsonify(swap_list)

# === Initialize DB ===
with app.app_context():
    db.create_all()

# === Run App ===
if __name__ == '__main__':
    app.run(debug=True)
