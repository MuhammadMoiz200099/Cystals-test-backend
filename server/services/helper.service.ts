
export class HelperService {

    tranformMeData(user) {
        return {
            id: user?.id,
            firstname: user?.firstname,
            lastname: user?.lastname,
            username: user?.username,
            email: user?.email,
            role: user?.role,
            createdDate: user?.createdDate
        };
    }

}

export default new HelperService();