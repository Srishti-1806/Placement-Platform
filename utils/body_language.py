import cv2
import mediapipe as mp

def analyze_body_language(video_path: str) -> int:
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose()
    cap = cv2.VideoCapture(video_path)

    posture_score = 0
    total_frames = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = pose.process(frame_rgb)

        if result.pose_landmarks:
            total_frames += 1
            left_shoulder = result.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
            right_shoulder = result.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]

            if abs(left_shoulder.y - right_shoulder.y) < 0.05:
                posture_score += 1

    cap.release()
    pose.close()

    if total_frames == 0:
        return 50

    percentage = (posture_score / total_frames) * 100
    return int(percentage)
