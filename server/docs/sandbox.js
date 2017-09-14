const obj1 = {
    loading: false,
    name: 'mike'
};

const newObj = Object.assign({}, obj1, { loading: true, name: 'biff' });

console.log(newObj);
