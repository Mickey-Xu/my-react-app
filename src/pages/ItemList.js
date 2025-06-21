import React from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

const ItemList = ({ item }) => {
    return (
        <div>
            <h2>{item.Name}</h2>
            {item.Children && item.Children.length > 0 ? (
                <ul>
                    {item.Children.map((child, index) => (
                        <li key={index}>
                            {child.Type === 'folder' ? (
                                <Link to={`/item/${child.Name}`}>{child.Name}</Link>
                            ) : (
                                <span>{child.Name}</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>没有子项1</p>
            )}
        </div>
    );
};

export default ItemList;
