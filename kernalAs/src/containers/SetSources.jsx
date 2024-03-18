import { useRef, useState } from "react";
import PlusIcon from "../../public/icons/plus.svg";
import CrossIcon from "../../public/icons/cross.svg";
import YoutubeIcon from "../../public/icons/youtube.svg";
import PDFIcon from "../../public/icons/pdf.svg";
import WebIcon from "../../public/icons/web.svg";
import DocIcon from "../../public/icons/doc.svg";
import SitemapIcon from "../../public/icons/sitemap.svg";
import TextIcon from "../../public/icons/text.svg";
import { FileUploader } from 'react-drag-drop-files';
import { useUpload } from "../hooks/r2";
import { db } from "../firebase/firebase";
import { doc, setDoc, arrayUnion } from 'firebase/firestore';

export default function SetSources({
    setChats,
    embedding_model,
    setSelectChat,
    bot_slug
}) {
    const [sourceName, setSourceName] = useState("");
    const [sourceValue, setSourceValue] = useState("");
    const [sourceType, setSourceType] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileTypes = ["CSV", "PDF"];
    const [isUploadActive, setUploadActive] = useState(false);

    const mainurl = useRef(null);

    const handleChange = async (file) => {
        const addDataSourceEntry = {
            sender: "B",
            message: `Adding the following ${dataTypes[sourceName]} : ${sourceValue}`,
        };
        setChats((prevChats) => [...prevChats, addDataSourceEntry]);
        if (addDataSourceEntry) {

            addChat(addDataSourceEntry)
        }

        useUpload(file).then(async (url) => {

            mainurl.current = url;
            let name = sourceName;
            let value = mainurl.current;
            setSourceValue("");

            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/add_sources`, {
                method: "POST",
                body: JSON.stringify({
                    embedding_model,
                    name,
                    value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {

                setSelectChat(true)
                const successEntry = {
                    sender: "B",
                    message: `Successfully added ${dataTypes[sourceName]} : ${sourceValue}`,
                };
                addChat(successEntry)
                setUploadActive(false);
                setChats((prevChats) => [...prevChats, successEntry]);

            } else {

                const errorEntry = {
                    sender: "B",
                    message: `Failed to add ${dataTypes[sourceName]}. Please try again.`,
                };
                setSelectChat(true)
                addChat(errorEntry)
                setChats((prevChats) => [...prevChats, errorEntry]);

            }
        })

    };


    const dataTypes = {
        youtube_video: "YouTube Video",
        pdf_file: "PDF File",
        web_page: "Web Page",
        doc_file: "Doc File",
        sitemap: "Sitemap",
        text: "Text",
    };

    const dataIcons = {
        youtube_video: <img className="w-5 h-5 mr-3" src={YoutubeIcon} alt="Your SVG" />,
        pdf_file: <img className="w-5 h-5 mr-3" src={PDFIcon} alt="Your SVG" />,
        web_page: <img className="w-5 h-5 mr-3" src={WebIcon} alt="Your SVG" />,
        doc_file: <img className="w-5 h-5 mr-3" src={DocIcon} alt="Your SVG" />,
        sitemap: <img className="w-5 h-5 mr-3" src={SitemapIcon} alt="Your SVG" />,
        text: <img className="w-5 h-5 mr-3" src={TextIcon} alt="Your SVG" />,
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
        setSourceName("");
        setSelectChat(true);
        setUploadActive(false);
        setIsURLInputVisible(false);
    };
    const handleDropdownSelect = (dataType) => {
        setSourceName(dataType);
        setSourceValue("");
        if (dataType == "youtube_video" || dataType == "web_page") {
            setSourceType("url");
        } else {
            setSourceType("file");
        }

        setIsDropdownOpen(false);
        setSelectChat(false);
        setUploadActive(true);
    };
    const addChat = async (payload) => {
        try {


            const workspaceRef = doc(db, 'Workspaces', bot_slug);

            await setDoc(workspaceRef, { chats: arrayUnion(payload) }, { merge: true });

            console.log('Document successfully updated in Workspaces collection.');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };


    const handleAddDataSource = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const addDataSourceEntry = {
            sender: "B",
            message: `Adding the following ${dataTypes[sourceName]} : ${sourceValue}`,
        };

        if (dataTypes[sourceName] && sourceValue) {
            addChat(addDataSourceEntry)
        }

        setChats((prevChats) => [...prevChats, addDataSourceEntry]);
        let name = sourceName;
        let value = sourceValue;
        setSourceValue("");
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/add_sources`, {
            method: "POST",
            body: JSON.stringify({
                embedding_model,
                name,
                value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const successEntry = {
                sender: "B",
                message: `Successfully added ${dataTypes[sourceName]} : ${sourceValue}`,
            };
            addChat(successEntry)
            setChats((prevChats) => [...prevChats, successEntry]);

        } else {
            const errorEntry = {
                sender: "B",
                message: `Failed to add ${dataTypes[sourceName]}. Please try again.`,
            };

            addChat(errorEntry)
            setChats((prevChats) => [...prevChats, errorEntry]);

        }
        setSourceName("");
        setIsLoading(false);
        setSelectChat(true);
        setUploadActive(false);
    };

    return (
        <>
            <div className="w-fit">
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-fit p-2.5 rounded-xl text-white bg-white border-2 border-black  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    <img className="w-6 h-6" src={PlusIcon} alt="Your SVG" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute left-0 bottom-full bg-white border border-gray-300 rounded-lg shadow-lg mb-2">
                        <ul className="py-1">
                            <li
                                className="block px-4 py-2 text-sm text-black cursor-pointer hover:bg-gray-200"
                                onClick={handleDropdownClose}
                            >
                                <span className="flex items-center text-red-600">
                                    {/* <CrossIcon className="" /> */}
                                    <img className="w-5 h-5 mr-3 " src={CrossIcon} alt="Your SVG" ></img>
                                    Close
                                </span>
                            </li>
                            {Object.entries(dataTypes).map(([key, value]) => (
                                <li
                                    key={key}
                                    className="block px-4 py-2 text-sm text-black cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleDropdownSelect(key)}
                                >
                                    <span className="flex items-center">
                                        {dataIcons[key]}
                                        {value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {sourceType == "url" && isUploadActive && (
                <form
                    onSubmit={handleAddDataSource}
                    className="w-full flex flex-col sm:flex-row gap-y-2 gap-x-2 items-center"
                >

                    <div className="w-[322px]">
                        <input
                            type="text"
                            placeholder="Enter URL, Data or File path here..."
                            className="text-sm w-full border-2 border-black rounded-xl focus:outline-none focus:border-blue-800 sm:pl-4 h-11"
                            required
                            value={sourceValue}
                            onChange={(e) => setSourceValue(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-fit">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? "opacity-60" : ""
                                } w-full bg-black hover:bg-blue-800 rounded-xl text-lg text-white px-6 h-11`}
                        >
                            Send
                        </button>
                    </div>
                </form>
            )}
            {sourceType == "file" && isUploadActive && (
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            )}
        </>
    );
}