import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { db } from '../../firebase';
import {
	collection,
	getDocs,
	query,
	orderBy,
	where,
	limit,
} from 'firebase/firestore';

export default function AllVideos() {
	const [allVideos, setAllVideos] = useState([]);
	const [videoIds, setVideoIds] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
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
	}, []);

	const handleVideoClick = (videoId) => {
		navigate(`/dashboard/${videoId}`);
	};

	return (
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
	);
}
