import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const { addToast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: user?.fullName,
            email: user?.email,
        }
    });

    const [isEditing, setIsEditing] = useState(false);
    
    if (!user) {
        return <div>Loading profile...</div>;
    }

    const onProfileSubmit = (data: any) => {
        updateUser({ fullName: data.fullName });
        addToast('Profile updated successfully!', 'success');
        setIsEditing(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] mb-6">My Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img 
                            src={user.profilePicture || `https://picsum.photos/seed/${user.id}/150/150`}
                            alt="Profile" 
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-accent/20"
                        />
                        <h2 className="text-2xl font-bold text-primary">{user.fullName}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="mt-2 inline-block bg-accent/10 text-accent text-sm font-semibold px-3 py-1 rounded-full">{user.role}</p>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-primary">Personal Information</h3>
                            <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </div>
                         <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
                            <Input 
                                label="Full Name" 
                                {...register('fullName', { required: "Full name is required" })}
                                error={errors.fullName?.message as string}
                                disabled={!isEditing}
                            />
                            <Input 
                                label="Email" 
                                {...register('email')}
                                disabled 
                            />
                            <Input 
                                label="Section"
                                defaultValue="CSE-DS"
                                disabled
                            />
                            {isEditing && (
                                <div className="text-right">
                                    <Button type="submit">Save Changes</Button>
                                </div>
                            )}
                        </form>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                        <h3 className="text-xl font-bold text-primary mb-4">Change Password</h3>
                        <form className="space-y-4">
                           <Input label="Old Password" type="password" />
                           <Input label="New Password" type="password" />
                           <Input label="Confirm New Password" type="password" />
                           <div className="text-right">
                               <Button type="submit" variant="secondary">Update Password</Button>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
