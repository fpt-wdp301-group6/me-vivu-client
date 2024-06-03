import { MovieCarousel } from '@/components';
import HeroSlide from './components/hero-slide';
import { Container } from '@mui/material';

const Home = () => {
    return (
        <div>
            <HeroSlide />
            <Container className="py-20">
                <MovieCarousel
                    url="/movie/upcoming?region=VN"
                    heading="Phim sắp chiếu"
                    id="upcoming"
                    className="mb-12"
                />
                <MovieCarousel url="/movie/now_playing?region=VN" heading="Phim đang chiếu" id="now-playing" />
            </Container>
        </div>
    );
};

export default Home;
