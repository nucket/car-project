import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import "./style.css"
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei"
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";
// import { texture } from "three";
import { Boxes } from "./Boxes"
import { Bloom,
  ChromaticAberration,
  EffectComposer,
  DepthOfField
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing"


/*
               __                                  __               __                                     _
              [  |  _                             [  |             |  ]                                   / |_
 ,--.   .---.  | | / ]  _ .--.   .--.   _   _   __ | | .---.   .--.| |  .--./) _ .--..--.  .---.  _ .--. `| |-'.--.
`'_\ : / /'`\] | '' <  [ `.-. |/ .'`\ \[ \ [ \ [  ]| |/ /__\\/ /'`\' | / /'`\;[ `.-. .-. |/ /__\\[ `.-. | | | ( (`\]
// | |,| \__.  | |`\ \  | | | || \__. | \ \/\ \/ / | || \__.,| \__/  | \ \._// | | | | | || \__., | | | | | |, `'.'.
\'-;__/'.___.'[__|  \_][___||__]'.__.'   \__/\__/ [___]'.__.' '.__.;__].',__` [___||__||__]'.__.'[___||__]\__/[\__) )
                                                                      ( ( __))
*/


/*
 ______                                         _                 __                           _____                               __   _
|_   _ `.                                      (_)               [  |                         |_   _|                             |  ] (_)
  | | `. \  .--.   _ .--..--.  .---.  _ .--.   __   .---.   .--.  | |.--.   _ .--.  ____        | |   _ .--.  _ .--.  ,--.    .--.| |  __   ,--.   _ .--.   .---.  .---.
  | |  | |/ .'`\ \[ `.-. .-. |/ /__\\[ `.-. | [  | / /'`\]/ .'`\ \| '/'`\ \[ `/'`\][_   ]       | |  [ `/'`\][ `/'`\]`'_\ : / /'`\' | [  | `'_\ : [ `.-. | / /'`\]/ /__\\
 _| |_.' /| \__. | | | | | | || \__., | | | |  | | | \__. | \__. ||  \__/ | | |     .' /_      _| |_  | |     | |    // | |,| \__/  |  | | // | |, | | | | | \__. | \__.,
|______.'  '.__.' [___||__||__]'.__.'[___||__][___]'.___.' '.__.'[__;.__.' [___]   [_____]    |_____|[___]   [___]   \'-;__/ '.__.;__][___]\'-;__/[___||__]'.___.' '.__.'

*/ 




function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.56} />

      <PerspectiveCamera makeDefault fov={50} position={[5, 3, 5]} />

      {/* {let color = new Color(0, 0, 0);} */}
      <color args={[0, 0, 0]} attached="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      {/* <Car /> */}
      <Rings />
      <Boxes />

      {/*
        let spotlight = new SpotLight();
        spotlight.intensity = 1.5;
        spotlight.position.set(...)
      */}

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={4.5}
        angle={0.6}
        penumbra={0.5}
        position={[9, 5, 0]}
        carShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={6}
        angle={0.6}
        penumbra={0.5}
        position={[-9, 5, 0]}
        carShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.5, 1, 0.6]}
        intensity={0.4}
        angle={1}
        penumbra={0.5}
        position={[0, 5, 13]}
        carShadowa
        shadow-bias={-0.0001}
      />

      <Ground />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh> */}
    </>
  );
}
      <EffectComposer>
      <DepthOfField focusDistance={0.9035} focalLength={0.91} bokehScale={9} height={480} />
      <Bloom
        blendFunction={BlendFunction.ADD}
        intensity={1.3} //  bloom intensity
        width={300} // render width
        height={300} // render height
        kernelSize={8} // blur kernel size
        luminanceThreshold={0.20} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.033} // smoothness of the luminance threshold. Range is [0, 1]
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // blend mode
        offset={[0.0005, 0.0012]} // color offset
      />
      </EffectComposer>


function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
