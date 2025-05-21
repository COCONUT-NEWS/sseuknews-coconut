import React from 'react';
import newspaperIcon from '../assets/newspaper.png';

export default function GuideBox() {
    return (
        <div
            style={{
                width: '100%',
                maxWidth: '366px',
                height: '146px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                marginBottom: '12px',
            }}
        >
            <img
                src={newspaperIcon}
                alt="news icon"
                style={{
                    width: '32px',
                    height: '32px',
                    marginTop: '0px',
                    marginBottom: '16px',
                }}
            />

            <p
                style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '140%',
                    color: '#535456',
                    textAlign: 'center',
                    margin: 0,
                    marginBottom: '4px',
                }}
            >
                보고 싶은 뉴스를
            </p>
            <p
                style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '140%',
                    color: '#000',
                    textAlign: 'center',
                    margin: 0,
                }}
            >
                쓱 선택하세요
            </p>
        </div>
    );
}