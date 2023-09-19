import axios from "axios"


export const PostUsers = (data) => {
  console.log("In post Users");
  console.log(data);
  axios.post('https://filmopedia-server.cyclic.app/server/newUserData', data,{
    headers:{
      Accept: 'application/json'
    }
  }).then((res) => {
    // console.log("data posted successfully");
  })
}



export const LoginAuth=async(state)=>{
  // console.log(state);
  try{
    const data = await axios.post(`https://filmopedia-server.cyclic.app/server/UserLogin?email=${state.Username}&password=${state.password}`,{
      
        headers:{
          'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Origin': 'https://chiruvaradani.github.io'
        }
    })
    // console.log(data.data);
    localStorage.setItem('token',data.data)
    return data.data
  }catch(err){
    // console.log(err);
  }
}

export const addtoWishlist = async (id,type) => {
  const tokenAuth = localStorage.getItem('token');
  // console.log(type);
  // console.log(id);
  if(tokenAuth){
    try {
      const data = await axios.post(`https://filmopedia-server.cyclic.app/server/${type}/${id}`, null, {
        headers: {
          Authorization: `Bearer ${tokenAuth}`
        }
      });
      return data.data
    } catch (error) {
      console.error('Error occurred:', error);
    }}
}

export const UpdateImage = async (profile) => {
  const tokenAuth = localStorage.getItem('token');
  try {
    const data = await axios.put(`https://filmopedia-server.cyclic.app/server/UpdateImage`, {profile:profile}, {
      headers: {
        Authorization: `Bearer ${tokenAuth}`,
        Accept:'application/json'
      }
    });
    return data.data
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

export const RemoveFromWishlist = async (id,type) => {
  const token = localStorage.getItem('token');
  // console.log(id);
  // console.log(type);
  try {
    const data = await axios.put(`https://filmopedia-server.cyclic.app/server/remove/${type}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
   return data.data
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

export const getUserData = async () => {
  const tokenAuth = localStorage.getItem('token');
  if(tokenAuth){
  try {

    // console.log(token);
    const response = await axios.get('https://filmopedia-server.cyclic.app/server/UserData', {
      headers: {
        Authorization: `bearer ${tokenAuth}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return null; // Handle the error appropriately based on your application's requirements
  }
  }
};
