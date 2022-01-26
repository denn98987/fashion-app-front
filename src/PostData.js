const postData = async photoData => {
    const data = new FormData();
    data.append('image', photoData);
    let response = await fetch(
        'https://product-detecting.herokuapp.com/api/image',
        {
            method: 'POST',
            body: data,
        },
    );
    console.log('Post data response: ', response);
    let json = await response.json();
    console.log('in postData:', response, json);
    return json;
};

export default postData;
