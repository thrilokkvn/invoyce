import { getUserData } from "@/actions/get-user-data";
import ProfileField from "@/components/profile-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import convertDate from "@/hooks/convert-date";
import { requireUser } from "@/hooks/require-user";
import {
    User,
    Mail,
    MapPin,
    Calendar
} from "lucide-react";


export default async function Profile() {
    const session = await requireUser();
    const profileData = await getUserData(session.user?.id as string);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="min-h-screen bg-white flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex flex-col items-center py-8 px-6 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                                <div className="relative avatar-float" style={{animation:"fadeIn 0.6s ease-out 0.2s both, float 3s ease-in-out infinite 0.8s",}}>
                                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-4 ring-white shadow-lg">
                                        <span className="text-3xl font-semibold text-gray-700">
                                            {(profileData?.firstName?.[0].toUpperCase() ?? "")}
                                            {(profileData?.lastName?.[0]?.toUpperCase() ?? "")}
                                        </span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-4 border-white" />
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-gray-900" style={{animation: "fadeIn 0.6s ease-out 0.3s both",}}>
                                    {profileData?.firstName} {profileData?.lastName}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1" style={{animation: "fadeIn 0.6s ease-out 0.4s both",}}>
                                    {profileData?.email}
                                </p>
                            </div>

                            <div className="p-6">
                                <div className="space-y-1">
                                    <ProfileField label="First Name" value={profileData?.firstName as string} icon={User} index={0} />
                                    <ProfileField label="Last Name" value={profileData?.lastName as string} icon={User} index={1}/>
                                    <ProfileField label="Email Address" value={profileData?.email as string} icon={Mail} index={2} />
                                    <ProfileField label="Address" value={profileData?.address as string} icon={MapPin} index={3}/>
                                    <ProfileField label="City" value={profileData?.city as string} icon={MapPin} index={4}/>
                                    <ProfileField label="Country" value={profileData?.country as string} icon={MapPin} index={5} />
                                    <ProfileField label="Postal Code" value={profileData?.postalCode as string} icon={MapPin} index={6} />
                                    <ProfileField label="Member Since" value={convertDate(profileData?.createdAt as Date)} icon={Calendar} index={7}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
