import React from "react";
import useUserIG from "../../hooks/useInstagram";

function ProfileInfo() {
  const { user } = useUserIG();
  return (
    <div>
      <h2 className="text-center">Informacion del usuario</h2>
      <p>
        Nombre de usuario: <strong>{user.userName}</strong>
      </p>
      <p>
        Tipo de cuenta: <strong>{user.accountType}</strong>
      </p>
      <p>
        Contenido compartido: <strong>{user.mediaCount}</strong>
      </p>
    </div>
  );
}

export default ProfileInfo;
