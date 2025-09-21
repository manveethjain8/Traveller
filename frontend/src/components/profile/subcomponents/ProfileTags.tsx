import { useProfileContext } from "../../../contexts/profileContext"

const ProfileTags = () => {

    const {handleTagToggle, userInfo} = useProfileContext()

    const selectionTags = ["Homebody", "Casual Walker", "Hiker", "Explorer", "Nature-lover", "Traveler", 
                            "Adventurer", "Thrill-seeker", "Extreme Sports Enthusiast", "Wanderer", 
                            "Free Spirit", "Outdoorsy", "Backpacker", "Campfire Lover", "Mountain Climber",
                            "Beach Lover", "Cyclist", "Runner", "Motorcyclist", "Survivalist"]

    return (
        <div className="h-fit">
            <div className="flex flex-wrap gap-2 gap-x-3">
                {selectionTags.map((s, idx) => (
                    <label className="items-center" key={idx}>
                        <input 
                            type="checkbox" 
                        
                            value={s} 
                            checked = {userInfo?.tags?.includes(s)}
                            onChange={() => handleTagToggle(s)}/>
                        <span className="ml-2">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default ProfileTags
