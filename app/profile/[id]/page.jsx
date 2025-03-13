import ProfilePage from '@components/ProfilePage'
import React from 'react'

async function UserProfile({ params }) {
    const { id } = await params

    const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()

    if (data.length === 0) {
        return <p className='no-result-text'>Failed to fetch user info.</p>
    }

    return (
        <ProfilePage userData={data} />
    )
}

export default UserProfile