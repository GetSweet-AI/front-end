import React, { useEffect, useState } from "react";
import axios from "axios";

const TemplateSelector = ({ userId, onSelectTemplate }) => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/admin/templates?userId=${userId}`);
                setTemplates(response.data.templates);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };

        fetchTemplates();
    }, [userId]);

    return (
        <div className="mb-3">
            <div className="flex flex-wrap gap-2">
                {templates.map((template) => (
                    <button className="bg-blue-100 p-2 rounded-md" key={template._id} onClick={() => onSelectTemplate(template)}>
                        {template.Title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
