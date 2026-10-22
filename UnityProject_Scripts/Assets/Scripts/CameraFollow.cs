using UnityEngine;

// دوربین دنبال‌کننده: در LateUpdate تا بعد از حرکت بازیکن به‌روز شود
public class CameraFollow : MonoBehaviour
{
    public Transform target;
    public Vector3 offset = new Vector3(0f, 2f, -10f);

    void LateUpdate()
    {
        if (target != null) transform.position = target.position + offset;
    }
}
