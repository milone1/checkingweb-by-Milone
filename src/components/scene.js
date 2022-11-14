import React,{useRef, useState, useEffect} from 'react'
import * as THREE from 'three';

function Scene() {
    const mountRef = useRef(null);
    useEffect(() => {
        const currentMount = mountRef.current();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        );
        scene.add(camera);
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    }, [])
    return (
        <div className='Contenedor3d' style={{ width: '100%', height: '100vh' }}>
            <h1>Hola</h1>
        </div>
    )
}

export default Scene