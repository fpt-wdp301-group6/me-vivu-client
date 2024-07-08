import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { GoTriangleDown } from 'react-icons/go';

const History = () => {
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<GoTriangleDown />} aria-controls="panel1-content" id="panel1-header">
                    <div className="flex items-center justify-between flex-1 pr-4">
                        <div>
                            <div>Tên phim</div>
                            <div>Ngày chiếu</div>
                        </div>
                        Thanh toán
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                    blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default History;
