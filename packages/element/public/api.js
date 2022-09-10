export async function getSlides(limit = 9, themes = 'jpg', gap = 32) {
    node.innerHTML = `Loading... 🚀`;
    try {
        const photos = await getPhotos({ width: 1280, height: 800 }, limit);
        if (node.isConnected && photos.length) {
            node.innerHTML = createSlides(node, photos);
            thumbs.innerHTML = createSlides(thumbs, photos);
        } else {
            node.innerHTML = `Slidy haven't items 🤷🏻‍♂️`;
        }
    } catch (error) {
        console.error(error);
        node.innerHTML = error;
    }

    function getPhotos(size, limit) {
        return new Promise((resolve, reject) => {
            const photos = [...Array(limit).keys()].map(() => {
                const width = utils.randomQ(size.width, ratio(size.width));
                const height = utils.randomQ(size.height, ratio(size.height));
                const source = { width, height };
                const max = { width: node.clientWidth, height: node.clientHeight - gap * 2 };
                const { W, H } = aspect(source, max);
                const src = `https://source.unsplash.com/random/${ratio(W)}x${ratio(H)}?${themes}`;
                return { width, height, src };
            });
            if (photos.length === limit) {
                setTimeout(() => resolve(photos), 500);
            } else reject('No photos');
        });
    }

    function createSlides(node, photos) {
        const slides = photos.map(({ width, height, src }, i) => {
            const source = { width, height };
            const max = { width: node.clientWidth, height: node.clientHeight - gap * 2 };
            const { W, H } = aspect(source, max);
            const imgSize = `width="${W}" height="${H}"`;
            const thumbsSize = `width="100" height="100"`;
            const background = `background-image: url(${src})`;
            const alt = `unsplashPhoto#${i}`;

            if (node.id === 'node') {
                return `<img id="${i}" src="${src}" ${imgSize} alt="${alt}"/>`;
            } else if (node.id === 'thumbs') {
                return `<button id="${i}" style="${background}" ${thumbsSize}>${i}</button>`;
            }
            else return `<button id="${i}">${i}</button>`;
        });
        return slides.join('');
    }

    function aspect(src, max) {
        let ratio = Math.min(max.width / src.width, max.height / src.height);
        return {
            W: Math.round(src.width * ratio),
            H: Math.round(src.height * ratio),
        };
    }
    function ratio(size) {
        return size * devicePixelRatio;
    }

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '6bb2d7ae39msh1a78a65afe6fca6p167ed5jsnae6b023541e8',
    //         'X-RapidAPI-Host': 'google-image-search1.p.rapidapi.com'
    //     }
    // };

    // fetch('https://google-image-search1.p.rapidapi.com/v2/?q=Paris&hl=en', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
}
