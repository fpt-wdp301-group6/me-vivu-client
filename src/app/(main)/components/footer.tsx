import { Container, Stack } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer
            className="py-20 bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url(/images/backgrounds/footer-bg.jpg)' }}
        >
            <Container>
                <div className="mb-12 text-center">
                    <Link href="/" className="text-3xl font-bold">
                        meVivu
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-10 text-center md:text-left">
                    <Stack gap={2}>
                        <Link href="#" className="hover:underline">
                            Trang chủ
                        </Link>
                        <Link href="#" className="hover:underline">
                            Liên hệ
                        </Link>
                        <Link href="#" className="hover:underline">
                            Về chúng tôi
                        </Link>
                    </Stack>
                    <Stack gap={2}>
                        <Link href="#" className="hover:underline">
                            FAQs
                        </Link>
                        <Link href="#" className="hover:underline">
                            Chính sách
                        </Link>
                        <Link href="#" className="hover:underline">
                            Diễn đàn
                        </Link>
                    </Stack>
                    <Stack gap={2}>
                        <Link href="#" className="hover:underline">
                            Hướng dẫn
                        </Link>
                        <Link href="#" className="hover:underline">
                            Thảo luận
                        </Link>
                        <Link href="#" className="hover:underline">
                            Bảng xếp hạng
                        </Link>
                    </Stack>
                    <Stack gap={2}>
                        <Link href="#" className="hover:underline">
                            Điều khoản sử dụng
                        </Link>
                        <Link href="#" className="hover:underline">
                            Chính sách bảo mật
                        </Link>
                        <Link href="#" className="hover:underline">
                            Chính sách DMCA
                        </Link>
                    </Stack>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
