import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';


function UserDetails() {



    const [user, setUser] = useState(null);
    const { id } = useParams(); // Get the user ID from the URL

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://127.0.0.1:5555/users/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('There was an error fetching the user:', error);
            }
        }

        fetchUser();
    }, [id]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="parent-container">

<div className="user-card">
                <img
                    src={user.photo_url || "default_image_url.jpg"}
                    alt={`${user.first_name} ${user.last_name}`}
                    
                />
                <h2 >{user.first_name} {user.last_name}</h2>
                <p >Email: {user.email}</p>
                <p >Email: {user.biography}</p>
                {/* Add more user details as needed */}
            </div>


        </div>


    );
}

export default UserDetails;
