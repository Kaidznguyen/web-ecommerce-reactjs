import React, { useEffect } from "react";
import Charts from 'chart.js/auto';
import "../../../assets/user-page/main.css";
import "../../../assets/user-page/grid-system.css";
import "../../../assets/user-page/reponsive.css";
import "../../../assets/user-page/main.js";

export default function Chart() {
    // PolarArea
    useEffect(() => {
        const ctx = document.getElementById('PolarArea').getContext('2d');
        const PolarArea = new Charts(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
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
    }, []);
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
        <div class="graphBox">
            <div class="box">
                <h1 class="title-box">Tổng quan các mô hình trong shop</h1>
                <canvas id="PolarArea" width="400" height="400"></canvas>
            </div>
            <div class="box">
                <h1 class="title-box">Doanh thu theo tháng</h1>
                <canvas id="PointStyling" width="600" height="400"></canvas>
            </div>
        </div>
    )
}
