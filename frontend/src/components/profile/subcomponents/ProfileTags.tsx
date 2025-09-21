import { useProfileContext } from "../../../contexts/profileContext"

const ProfileTags = () => {

    const {handleTagToggle, userInfo} = useProfileContext()

    const selectionTags = ["homebody", "casual walker", "hiker", "explorer", "nature-lover", "traveler",
                            "adventurer", "thrill-seeker", "extreme sports enthusiast", "wanderer",
                            "free spirit", "outdoorsy", "backpacker", "campfire lover", "mountain climber",
                            "beach lover", "cyclist", "runner", "motorcyclist", "survivalist"]

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
