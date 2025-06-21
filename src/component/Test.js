import React from 'react';
import './test.css';
const data = {
    totalIncome: 100000,
    totalTax: 775.89,
    records: [
        {
            date: '2024-09',
            company: '上海巴斯夫材料有限公司',
            income:10471.26,
            tax: 81.79,
        },
        {
            date: '2024-08',
            company: '上海巴斯夫材料有限公司',
            income: 9735.63,
            tax: 59.72,
        },
        {
            date: '2024-07',
            company: '上海巴斯夫材料有限公司',
            income: 5000.00,
            tax: 0.00,
        },
        {
            date: '2024-07',
            company: '上海巴斯夫材料有限公司',
            income: 100000.00,
            tax: 0.00,
        },
    ],
};
function App() {
    return (
        <div className="container">
            <header>
                <button className="back-btn">返回</button>
                <h1>藏小胖收入纳税明细</h1>
                <a href="#" className="appeal-link">批量申诉</a>
            </header>
            <section className="summary">
                <p>收入合计：<span>{data.totalIncome.toFixed(2)}元</span></p>
                <p>已申报税额合计：<span>{data.totalTax.toFixed(2)}元</span></p>
            </section>
            <section className="details">
                {data.records.map((item, index) => (
                    <div key={index} className="record">
                        <h3>工资薪金 <span>{item.date}</span></h3>
                        <p>所得项目小类：正常工资薪金</p>
                        <p>扣缴义务人：{item.company}</p>
                        <p>收入：{item.income.toFixed(2)}元</p>
                        <p>已申报税额：{item.tax.toFixed(2)}元</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
export default App;