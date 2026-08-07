// TODO: 백엔드 팀 API 연동되면 아래 mock 제거하고 axiosInstance.get("/users/me") 호출로 교체
const MOCK_PROFILE = {
  name: "김레주",
  email: "김레주@email.com",
  membership: "멤버",
  age: 26,
  country: "대한민국",
  avatarUrl: null,
};

export const getMyProfile = async () => {
  return MOCK_PROFILE; // { name, email, membership, age, country, avatarUrl }
};
