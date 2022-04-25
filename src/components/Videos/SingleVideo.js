import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {
	collection,
	doc,
	getDocs,
	getDoc,
	setDoc,
	query,
	where,
	updateDoc,
	arrayUnion,
	arrayRemove,
	increment,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';

export default function SingleVideo() {
	const [video, setVideo] = useState('');
	const [showComment, setShowComment] = useState(true);
	const [newComment, setNewComment] = useState('');
	const [allComments, setAllComments] = useState([]);
	const [allVideos, setAllVideos] = useState([]);
	const [videoIds, setVideoIds] = useState([]);
	const navigate = useNavigate();

	const { videoId } = useParams();

	useEffect(() => {
		const getVideo = async () => {
			const docRef = doc(db, 'videos', videoId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setVideo(docSnap.data().url);
			} else {
				console.log('unable to get video!');
			}
		};
		getVideo();

		const getAllVideos = async () => {
			const videosArr = [];
			const videosId = [];
			const q = query(collection(db, 'videos'));
			const docSnap = await getDocs(q);
			docSnap.forEach((doc) => {
				videosArr.push(doc.data().url);
				videosId.push(doc.id);
			});
			setAllVideos(videosArr);
			setVideoIds(videosId);
		};
		getAllVideos();
	}, [videoId]);

	const toggleComments = () => {
		if (showComment === true) {
			setShowComment(false);
		} else {
			setShowComment(true);
		}
	};

	const addComment = () => {
		setAllComments([...allComments, newComment]);
	};

	const handleVideoClick = (videoId) => {
		navigate(`/dashboard/${videoId}`);
		window.location.reload(false);
	};

	return (
		<div>
			<button onClick={() => navigate('/dashboard')}>Home</button>
			<ReactPlayer url={video} />
			<button onClick={() => toggleComments()}>Comments:</button>
			{showComment ? (
				<div>
					<textarea onChange={(e) => setNewComment(e.target.value)} />
					<button onClick={() => addComment()}>Add Comment</button>
					{allComments.map((singleComment) => {
						return (
							<div style={{ borderStyle: 'solid', marginBottom: '1rem' }}>
								{singleComment}
							</div>
						);
					})}
				</div>
			) : null}
			<div>Related Videos:</div>
			<div>
				{allVideos.map((video, id) => {
					return (
						<div key={id} style={{ paddingBottom: '2rem' }}>
							<ReactPlayer url={allVideos.length ? video : null} />
							<button onClick={() => handleVideoClick(videoIds[id])}>
								Go To Video
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
