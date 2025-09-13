import backArrow from '../../../assets/icons/arrow_back_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import editIcon from '../../../assets/icons/edit_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'

import { useProfileContext } from "../../../contexts/profileContext"

const EditProfile = () => {

    const {setEditProfileClicked, handleInputChange, handleSaveChanges,  ppPreview, userInfo} = useProfileContext()

    return (
        <div className="bg-[#242424] fixed w-screen h-screen flex justify-center items-center" >
            <div className='flex flex-col w-[80%] h-[80%] box-border p-5'>
                {/* Start of top bar */}
                <div className='relative w-full flex justify-center
                                2xl:h-[2.5rem] 3xl:h-[3rem]'
                >
                    <button 
                        onClick={() => setEditProfileClicked(prev => !prev)}
                    >
                        <img 
                            className='absolute left-[1rem] top-[0.1rem] rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                        2xl:p-1'
                            src={backArrow} 
                            alt='Back Arrow'
                        />
                    </button>
                    <p className='font-[Oddly-Calm] 2xl:text-[1.7rem] 3xl:text-[2.2rem]'>Profile's Information</p>
                </div>
                {/* End of top bar */}

                {/* Start of inputs */}
                <div className='w-full flex flex-1 box-border px-5 py-2'>

                    {/* Start of Profile Picture and Tagline */}
                    <div className='flex flex-col flex-1 justify-center items-center'>
                        <div className='relative mt-[1rem] bg-[#36454F] rounded-full
                                        2xl:h-[12rem] 2xl:w-[12rem]
                                        3xl:h-[14rem] 3xl:w-[14rem]'>
                            <>
                                {ppPreview ? 
                                    (
                                        <img 
                                            className='rounded-full object-cover
                                                        2xl:h-[12rem] 2xl:w-[12rem]
                                                        3xl:h-[14rem] 3xl:w-[14rem]' 
                                            src={ppPreview}
                                        />
                                    ) : (
                                        <img 
                                            className='rounded-full object-cover
                                                        2xl:h-[12rem] 2xl:w-[12rem]
                                                        3xl:h-[14rem] 3xl:w-[14rem]' 
                                            src={userInfo?.profilePicture as string}
                                        />
                                    )
                                }
                                <input
                                    id='fileInput'
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if(file){
                                            handleInputChange('profilePicture', file)
                                        }
                                    }}
                                />
                                <label htmlFor='fileInput'>
                                    <img
                                        className="absolute bg-red-500 p-1 rounded-full hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer
                                                    2xl:top-[8rem] 2xl:right-[0rem] 2xl:p-[0.4rem]
                                                    3xl:top-[10rem]"
                                        src={editIcon}
                                        alt="Edit Icon"
                                    />
                                </label>
                            </>

                        </div>
                        <div className='mt-[1rem] w-full flex-1 box-border'>
                            <textarea
                                className='bg-[#36454F] rounded-2xl placeholder:text-white placeholder:text-center w-full h-full focus:outline-none resize-none
                                2xl:p-4
                                3xl:p-5 3xl:text-[1.2rem]'
                                placeholder={userInfo.tagline ?? 'Enter your tag-line...'}
                                onChange={(e) => handleInputChange('tagline', e.target.value)}
                            />
                        </div>
                    </div>
                    {/* End of Profile Picture and Tagline */}

                    {/* Start of Divider */}
                    <div className='bg-red-500 w-[0.1rem] h-[90%] self-center mx-[1rem]'></div>
                    {/* End of Divider */}

                    {/* Start of Other Information */}
                    <div className='flex flex-col flex-3'>

                        {/* Start of Information Part */}
                        <div className='flex flex-3'>
                            <div className='flex flex-col flex-1 p-2
                                        2xl:py-[3rem] 2xl:gap-y-[2rem]
                                        3xl:py-[4rem] 3xl:gap-y-[3rem] 3xl:text-[1.2rem]'>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>First Name</p>
                                    <input
                                        className='bg-[#36454F] rounded-xl placeholder:text-white placeholder:text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                        placeholder={userInfo.firstName ?? '...'}
                                        onChange={(e) => handleInputChange('firstName',e.target.value)}
                                    />
                                </div>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>Last Name</p>
                                    <input
                                        className='bg-[#36454F] rounded-xl placeholder:text-white placeholder:text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                        placeholder={userInfo.lastName ?? '...'}
                                        onChange={(e) => handleInputChange('lastName',e.target.value)}
                                    />
                                </div>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>User Name</p>
                                    <input
                                        className='bg-[#36454F] rounded-xl placeholder:text-white placeholder:text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                        placeholder={userInfo.userName ?? '...'}
                                        onChange={(e) => handleInputChange('userName',e.target.value)}
                                    />
                                </div>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>Gender</p>
                                    <select
                                        defaultValue={userInfo.gender ?? '...'}
                                        className='bg-[#36454F] rounded-xl placeholder:text-white text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                        
                                    >
                                        <option value="gender" disabled>...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col flex-1 p-2
                                            2xl:py-[3rem] 2xl:gap-y-[2rem]
                                             3xl:py-[4rem] 3xl:gap-y-[3rem] 3xl:text-[1.2rem]'>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>District</p>
                                    <input
                                        className='bg-[#36454F] rounded-xl placeholder:text-white placeholder:text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                        placeholder={userInfo.district ?? '...'}
                                        onChange={(e) => handleInputChange('district', e.target.value)}
                                    />
                                </div>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>State</p>
                                    <input
                                        className='bg-[#36454F] rounded-xl placeholder:text-white placeholder:text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                        placeholder={userInfo.state ?? '...'}
                                        onChange={(e) => handleInputChange('state', e.target.value)}
                                    />
                                </div>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>Country</p>
                                    <input
                                        className='bg-[#36454F] rounded-xl placeholder:text-white placeholder:text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                        placeholder={userInfo.country ?? '...'}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                    />
                                </div>
                                <div className='h-fit w-full'>
                                    <p className='pl-3'>Date Of Birth</p>
                                    <input
                                        type='date'
                                        className='bg-[#36454F] rounded-xl placeholder:text-white placeholder:text-center w-full focus:outline-none indent-[1rem]
                                                    2xl:p-1'
                                        defaultValue={userInfo.date_of_birth ?? ''}
                                        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* End of Information Part */}

                        {/* Start of Save Changes Button */}
                        <div className='flex flex-1 justify-center items-center'>
                            <button 
                                className='bg-red-500 h-fit w-fit rounded-3xl hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-2 
                                3xl:text-[1.2rem]'
                                onClick={() => handleSaveChanges()}
                            >
                                Save Changes
                            </button>
                        </div>
                        {/* End of Save Changes Button */}

                    </div>
                    {/* End of Other Information */}

                </div>
                {/* End of inputs */}

            </div>
        </div>
    )
}

export default EditProfile
