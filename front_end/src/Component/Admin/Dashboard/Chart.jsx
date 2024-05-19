import React, { useState, useEffect } from "react";
import Charts from 'chart.js/auto';
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";
import FigureAPI from "../../../Service/FigureAPI.js";

export default function Chart() {
    const [figures, setFigures] = useState([]);
    const uniqueColors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
    ];
    useEffect(() => {
        async function fetchCountFigure() {
            try {
                const response = await FigureAPI.getCountFigure();
                if (response.status) {
                    const allData = response.data.map(item => ({
                        name: item.name_cate,
                        count: item.product_count
                    }));
                    setFigures(allData);
                } else {
                    console.error("API error: ", response.error);
                }
            } catch (error) {
                console.error("Error fetching total price delivered: ", error);
            }
        }
    
        fetchCountFigure();
    }, []);
    
    // PolarArea
    useEffect(() => {
        if (figures.length > 0) {
            const ctx = document.getElementById('PolarArea').getContext('2d');
            const dataLabels = figures.map(item => item.name);
            const dataValues = figures.map(item => item.count);
            const backgroundColors = uniqueColors.slice(0, figures.length);
            const PolarArea = new Charts(ctx, {
                type: 'polarArea',
                data: {
                    labels: dataLabels,
                    datasets: [{
                        label: 'số lượng',
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        borderColor: backgroundColors.map(color => color.replace('0.6', '0.2')),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            grid: {
                                color: 'red',
                            }
                        }
                    }
                }
            });
            return () => {
                PolarArea.destroy();
            };
        }
    }, [figures]);
    
    // Point Styling
    useEffect(() => {
        const ctx = document.getElementById('PointStyling').getContext('2d');
        const PointStyling = new Charts(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu nền của điểm
                    pointBorderColor: 'rgba(75, 192, 192, 1)', // Màu viền của điểm
                    pointBorderWidth: 2, // Độ dày của viền của điểm
                    pointStyle: 'rectRounded' // Kiểu của điểm, ví dụ: 'circle', 'rect', 'triangle', 'rectRounded'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return () => {
            PointStyling.destroy();
        };
    }, []);
    return (
        <div className="graphBox">
            <div className="box">
                <h1 className="title-box">Thống kê số lượng mô hình theo loại</h1>
                <canvas id="PolarArea" width="400" height="400"></canvas>
            </div>
            <div className="box">
                <h1 className="title-box">Doanh thu theo tháng</h1>
                <canvas id="PointStyling" width="600" height="400"></canvas>
            </div>
        </div>
    )
}
