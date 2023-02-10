import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";
import { Link } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    // 헤더,시간
    <div className='DiaryEditor'>
      <div className="shadow">
        <div className='header_box'>
          <MyHeader
            headText={isEdit ? "일기수정하기" : "Today"}
            leftChild={
              <MyButton
                text={"<뒤로"}
                onClick={() => navigate(-1)} />
            }
            rightChild={
              isEdit && (
              <MyButton
                text={"삭제하기"} 
                type={"negative"} 
                onClick={handleRemove}
                />
              )
            }
          />
                  <Link to = "/home">
          <button className='goHome_header_Btn'>home</button>
        </Link>
          <div className='input_box'>
            <input className='input_date' value={date} onChange={(e) => setDate(e.target.value)} type="date" />
          </div>
          <div>
          </div>

          {/* 감정,날씨 api */}
          <section className='top_box'>
            <div className='input_box emotion_list_wrapper'>
              {emotionList.map((it) => (
                <EmotionItem
                  key={it.emotion_id}
                  {...it}
                  onClick={handleClickEmote}
                  isSelected={it.emotion_id === emotion}
                />
              ))}
              <div className='weatherApi'>
              </div>
              {/* <WeatherAPI/> */}
            </div>
          </section>


          {/* 일기 작성폼 */}
          <section className='second_box'>
            <div className='input_box_2 text_wrapper'>
              <textarea
                placeholder="오늘은 어땠나요?"
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </section>

          {/* 취소,삭제버튼 */}
          <section>
            <div className='control_box'>
              <MyButton
                text={'취소하기'}
                onClick={() => navigate(-1)}
              />
              <MyButton
                text={'작성완료'}
                type={'positive'}
                onClick={handleSubmit}
              />
            </div>
          </section>

        </div>

        {/* 음악 api */}
        <section>
          <div className='music'>
            <h3>오늘의 추천 음악은?</h3>
            <ul>
            <li className="scroll-arrow"></li>
            <li className="scroll-arrow2"></li>
            </ul>
            {/* <SpotifyAPI/> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
